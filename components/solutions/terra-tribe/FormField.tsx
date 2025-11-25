import { FormState } from "@/types";

// --- Reusable Form Input Component ---
interface FormFieldProps {
    id: keyof FormState;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: string;
    placeholder?: string;
    options?: string[];
    disabled?: boolean;
    required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    options,
    disabled = false,
    required
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {options ? (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
            )}
        </div>
    );
};

export default FormField;