export function formatDate(isString:string) : string {
  const date = new Date(isString)
  const formatter = new Intl.DateTimeFormat('es-ES',{
    year:'numeric',
    month:'long',
    day:'numeric'
  })

  return formatter.format(date)
}
