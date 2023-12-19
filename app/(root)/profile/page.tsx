import Collection from '@/components/shared/collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/lib/types'
import { auth } from '@clerk/nextjs'
import events from 'events'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams}: SearchParamProps) => {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string

  const ordersPage = Number(searchParams?.ordersPage) || 1
  const eventsPage = Number(searchParams?.eventsPage) || 1

  const orders = await getOrdersByUser({userId, page: ordersPage})

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []

  const organizedEvents = await getEventsByUser({userId, page: eventsPage})

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Meus Tickets</h3>

          <Button asChild size="lg" className='button hidden sm:flex'>
            <Link href="/#events">
              Veja mais eventos
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
      <Collection
          data={orderedEvents}
          emptyTitle="Sem eventos comprados no momento"
          emptyStateSubText="Continue vendos os eventos e descubra o seu favorito!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={orders?.totalPages}
        />
      </section>

      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Meus eventos organizados</h3>

          <Button asChild size="lg" className='button hidden sm:flex'>
            <Link href="/events/create">
              Criar um novo evento
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
      <Collection
          data={organizedEvents?.data}
          emptyTitle="Sem eventos criados no momento"
          emptyStateSubText="Crie seu primeiro evento agora mesmo!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName='eventsPage'
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage