import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ value, disabled, onChange, label }) => {
    const [base64, setBase64] = useState(value)

    const handleChange = useCallback((base64) => {
        onChange(base64)
    }, [onChange])

    const handleDrop = useCallback((files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }

        reader.readAsDataURL(file)
    }, [handleChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg' : [],
            'image/png' : []
        }
    });

  return (
    <div
        {...getRootProps({
            className: 'w-full px-4 h-[150px] py-3 text-white text-center border-2 border-dotted rounded-xl border-neutral-700 relative flex items-center justify-center py-5'
        })}
    >
        <input {...getInputProps()} />
        {
            base64 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <img
                        src={base64}
                        alt="Uploaded Image"
                        className="rounded-xl w-full relative h-full object-cover"
                    />
                </div>
            ) : (
                <p className="text-white">{label}</p>
            )
        }
    </div>
  )
}

export default ImageUpload