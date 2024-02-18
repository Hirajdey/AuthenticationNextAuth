'use client'

const AppInput = ({type, name, value, onChange, labelText, placeholder}) => {
  return (
    <div>
			{labelText && (
				<label>{labelText}</label>
			)}
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required
				className="m-2 bg-slate-400 rounded"
			/>
    </div>
  )
}

export default AppInput;