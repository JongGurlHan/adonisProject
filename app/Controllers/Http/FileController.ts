import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import FileuploadValidator from 'App/Validators/FileuploadValidator'

//https://medium.com/litslink/adonisjs-file-storage-upload-and-download-files-from-server-a8dbf7ab0528

export default class FileController {
  public async uploadFile({ request }: HttpContextContract) {
    const validatedData = schema.create({
      file: schema.file({
        size: '2mb',
        extnames: ['txt'],
      }),
    })

    const payload = await request.validate({ schema: validatedData })

    await payload.file.move(Application.tmpPath('uploads'))

    // const validatedData = await request.validate(FileuploadValidator)
    // console.log(validatedData.tasks)

    // if (!validatedData.tasks || !validatedData.tasks.isValid) {
    //   await validatedData.tasks.move(Application.tmpPath('uploads'))

    //   return response.send({
    //     message: 'problme with file!',
    //   })
    // } else {
    //   return response.created({
    //     message: 'file uploaded',
    //   })
    // }
  }
}
