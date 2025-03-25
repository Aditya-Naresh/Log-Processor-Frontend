import LogDetails from '../../../components/LogDetails.tsx'
export default function File({params}:{
  params:Promise<{file_id:string}>;
}) {
  return (
    <LogDetails file_id={params.file_id} />
  )
}
