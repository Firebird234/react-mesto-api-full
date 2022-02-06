import { useState, useCallback } from "react";

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.validity.valueMissing === true) {
            setErrors({
                ...errors,
                [name]: "Будь котиком, зополни пустое поле",
            });
        } else if (e.target.validity.tooShort === true) {
            setErrors({
                ...errors,
                [name]: "Коротковато, давай подключим фантазию",
            });
        } else if (e.target.validity.typeMismatch === true) {
            setErrors({
                ...errors,
                [name]: "Ну вообще-то тут нужна ссылка, а не вот это вот=)",
            });
        } else {
            setErrors({ ...errors, [name]: e.target.validationMessage });
        }
        setValues({ ...values, [name]: value });

        setIsValid(e.target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
        setValues,
        setIsValid,
    };
}
