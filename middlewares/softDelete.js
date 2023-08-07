const addSoftDelete = async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update'
    params.args.data = { deletedAt: true }
  }
  return next(params)
}

export default addSoftDelete
