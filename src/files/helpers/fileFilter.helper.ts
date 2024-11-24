
//valida que las extension del archivo este dentro de una lista de permitidos
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/').at(1);
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtensions.includes(fileExtension)) return callback(new Error('File not acepted'), false);


  callback(null, true);

}