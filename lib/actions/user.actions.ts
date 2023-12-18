'use server'

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { CreateUserParams, UpdateUserParams } from "../types"
import { handleError } from "../utils"
import Event from "../database/models/event.model"
import Order from "../database/models/order.model"


export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) {
      throw new Error('User not found')
    }

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    await Promise.all([
      //update the events collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // update the orders collection to remove references to the user
      Order.updateMany({ _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }),
    ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}