interface IContact {
  title: string;
  subtitle: string;
  email: string;
  bg_color:string
}
export const PoliciesContact = ({title,subtitle,email,bg_color}:IContact): JSX.Element => {
  return (
    <div className={`mt-12 p-8 ${bg_color} rounded-2xl`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {title}
                </h2>
            <p className="text-gray-700-300 mb-4">
                {subtitle}
                </p>
         <div className="space-y-2 text-gray-700 ">
            <p>{email} </p>
        </div>
    </div>
  )
}

