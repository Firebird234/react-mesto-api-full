import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/Validation";

function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      avatar: values.avaLink,
    });
  }

  React.useEffect(() => {
    setValues({ avaLink: "" });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      // validButton={props.validity.isValid}
      loader={props.loader}
      onSubmit={handleSubmit}
      title="Обновить&nbsp;аватар"
      name="card-removal"
      isOpen={props.isOpen}
      onCloseAll={props.onClose}
      children={
        <>
          <input
            value={values.avaLink || ""}
            onChange={handleChange}
            type="url"
            className="popup__field popup__field_type_link"
            placeholder="Ссылка на аватар"
            name="avaLink"
            id="ava-link"
            required
          />
          <span className="error" id="ava-link-error">
            {errors.avaLink}
          </span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;

// import React from "react";
// import PopupWithForm from "./PopupWithForm";
// import { useFormAndValidation } from "../hooks/Validation";

// function EditAvatarPopup(props) {
//     const [inputData, setInputData] = React.useState({ current: "" });

//     const handleChangee = (event) => {
//         setInputData({ current: event.target.value });
//         // props.handleValidity(event.target);
//     };
//     const { values, handleChange, errors, isValid, setValues, resetForm } =
//         useFormAndValidation();

//     function handleSubmit(e) {
//         e.preventDefault();
//         props.onUpdateUser({
//             avatar: inputData.current.value,
//         });
//     }

//     React.useEffect(() => {
//         inputData.current.value = "";
//     }, [props.isOpen]);

//     return (
//         <PopupWithForm
//             // validButton={props.validity.isValid}
//             loader={props.loader}
//             onSubmit={handleSubmit}
//             title="Обновить&nbsp;аватар"
//             name="card-removal"
//             isOpen={props.isOpen}
//             onCloseAll={props.onClose}
//             children={
//                 <>
//                     <input
//                         value={inputData.current}
//                         onChange={handleChangee}
//                         ref={inputData}
//                         type="url"
//                         className="popup__field popup__field_type_link"
//                         placeholder="Ссылка на аватар"
//                         name="avaLink"
//                         id="ava-link"
//                         required
//                     />
//                     <span className="error" id="ava-link-error">
//                         {/* {props.validity.message.avaLink} */}
//                     </span>
//                 </>
//             }
//         />
//     );
// }

// export default EditAvatarPopup;
