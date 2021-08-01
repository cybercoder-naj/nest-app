import { Injectable, NestMiddleware, HttpException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { students } from '../../db'

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const studentId = req.params.studentId
    const studentExists = students.some((student) => student.id === studentId)
    if (!studentExists) throw new HttpException('Student not found', 404)

    next()
  }
}
