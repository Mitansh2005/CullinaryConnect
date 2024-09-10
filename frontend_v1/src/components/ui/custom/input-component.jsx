export function InputComponent({label,type,placeholder,name}){
  return(
    <>
    <label>{label}</label>
    <input type={type} placeholder={placeholder} name={name} className="border-2 p-2 rounded-lg m-2 focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150 "></input>
    </>
  )
}