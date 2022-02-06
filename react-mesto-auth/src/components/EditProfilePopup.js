import React from "react";
import PopupWithForm from "./PopupWithForm";
import {
    CurrentUserContext,
    currentUser,
} from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/Validation";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, setValues, resetForm } =
        useFormAndValidation();

    React.useEffect(() => {
        setValues({
            ...values,
            editName: currentUser.name,
            editDescription: currentUser.about,
        });
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: values.editName,
            about: values.editDescription,
        });
    }

    return (
        <PopupWithForm
            validButton={isValid}
            loader={props.loader}
            onSubmit={handleSubmit}
            title="Редактировать&nbsp;профиль"
            name="edit"
            isOpen={props.isOpen}
            onCloseAll={props.onClose}
            children={
                <>
                    <input
                        type="text"
                        value={values.editName || ""}
                        onChange={handleChange}
                        className="popup__field popup__field_type_name"
                        placeholder="Жак-Ив-Кусто"
                        name="editName"
                        id="name"
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="error" id="name-error">
                        {errors.editName}
                    </span>
                    <input
                        type="text"
                        value={values.editDescription || ""}
                        onChange={handleChange}
                        className="popup__field popup__field_type_job"
                        name="editDescription"
                        placeholder="Исследователь океана"
                        id="profession"
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span className="error" id="profession-error">
                        {errors.editDescription}
                    </span>
                </>
            }
        />
    );
}

export default EditProfilePopup;

// import React from "react";
// import PopupWithForm from "./PopupWithForm";
// import {
//     CurrentUserContext,
//     currentUser,
// } from "../contexts/CurrentUserContext";

// function EditProfilePopup(props) {
//     const currentUser = React.useContext(CurrentUserContext);

//     const [inputName, setName] = React.useState({
//         editName: "",
//         editDescription: "",
//     });

//     React.useEffect(() => {
//         setName({
//             ...inputName,
//             editName: currentUser.name,
//             editDescription: currentUser.about,
//         });
//     }, [currentUser, props.isOpen]);

//     const handleChange = (event) => {
//         setName({ ...inputName, [event.target.name]: event.target.value });
//         props.handleValidity(event.target);
//         console.log(inputName);
//     };

//     function handleSubmit(e) {
//         e.preventDefault();
//         props.onUpdateUser({
//             name: inputName.editName,
//             about: inputName.editDescription,
//         });
//     }

//     return (
//         <PopupWithForm
//             validButton={props.validity.isValid}
//             loader={props.loader}
//             onSubmit={handleSubmit}
//             title="Редактировать&nbsp;профиль"
//             name="edit"
//             isOpen={props.isOpen}
//             onCloseAll={props.onClose}
//             children={
//                 <>
//                     <input
//                         type="text"
//                         value={inputName.editName || ""}
//                         onChange={handleChange}
//                         className="popup__field popup__field_type_name"
//                         placeholder="Жак-Ив-Кусто"
//                         name="editName"
//                         id="name"
//                         required
//                         minLength="2"
//                         maxLength="40"
//                     />
//                     <span className="error" id="name-error">
//                         {props.validity.message.editName}
//                     </span>
//                     <input
//                         type="text"
//                         value={inputName.editDescription || ""}
//                         onChange={handleChange}
//                         className="popup__field popup__field_type_job"
//                         name="editDescription"
//                         placeholder="Исследователь океана"
//                         id="profession"
//                         required
//                         minLength="2"
//                         maxLength="200"
//                     />
//                     <span className="error" id="profession-error">
//                         {props.validity.message.editDescription}
//                     </span>
//                 </>
//             }
//         />
//     );
// }

// export default EditProfilePopup;
