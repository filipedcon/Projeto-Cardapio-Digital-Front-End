import { useEffect, useState } from "react";
import { useFoodDataMutate } from '../../../hooks/useFoodDataMutate';
import { FoodData } from "../../../interface/FoodData";
import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}
interface ModalProps{
    closeModal(): void
}
const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal } : ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isLoading, isSuccess } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    }

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess, closeModal]); 

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                <Input label="Title" value={title} updateValue={setTitle}></Input>
                <Input label="Price" value={price} updateValue={setPrice}></Input>
                <Input label="Image" value={image} updateValue={setImage}></Input>
                </form>
                <button onClick={submit} className="btn-secondary">
                {isLoading ? 'Postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}