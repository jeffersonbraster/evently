import * as z from 'zod'

export const formEventSchema = z.object({
  title: z.string().min(3, { message: 'Titulo deve ter pelo menos 3 caracteres' }),
  description: z.string().min(3, { message: 'Descrição deve ter pelo menos 3 caracteres' }).max(400, { message: 'Descrição deve ter no máximo 400 caracteres' }),
  location: z.string().min(3, { message: 'Localização deve ter pelo menos 3 caracteres' }).max(400, { message: 'Localização deve ter no máximo 400 caracteres' }),
  imageUrl: z.string().url({ message: 'Url da imagem inválida' }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url({ message: 'Url inválida' }),
})