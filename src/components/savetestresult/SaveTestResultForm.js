import { useState } from "react";
import useInput from "../../hooks/use-input";
import FormCard from "../formcard/FormCard";
import ResponseModal from "../responsemodal/ResponseModal";
import classes from "./SaveTestResultForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const SaveTestResultForm = (props) => {
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
        props.onBack();
    };

    const showModalHandler = (title, message) => {
        resetTestResult();
        resetImageFile();
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    };

    const {
        value: testResult,
        isValid: testResultIsValid,
        hasError: testResultInputHasError,
        valueChangeHandler: testResultChangeHandler,
        inputBlurHandler: testResultInputBlurHandler,
        reset: resetTestResult,
    } = useInput(isNotEmpty);

    const {
        value: imageFile,
        isValid: imageFileIsValid,
        hasError: imageFileInputHasError,
        valueChangeHandler: imageFileChangeHandler,
        inputBlurHandler: imageFileInputBlurHandler,
        reset: resetImageFile,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (testResultIsValid && imageFileIsValid) {
        formIsValid = true;
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const testResultInputClasses = testResultInputHasError
        ? errorClasses
        : normalClasses;
    const imageFileInputClasses = imageFileInputHasError
        ? errorClasses
        : normalClasses;

    const testResultErrorMessage = testResultInputHasError
        ? "Test result must not be empty."
        : null;
    const imageFileErrorMessage = imageFileInputHasError
        ? "Please upload the test result image."
        : null;

    const saveTestResposeHandler = (data) => {
        if (data.success) {
            showModalHandler(
                "Save Test Result",
                "Successfully saved the test result."
            );
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            const fileInput = document.getElementById("resultImage");
            const formData = new FormData();
            formData.append("test_result_image", fileInput.files[0]);
            formData.append("test_result", testResult);
            formData.append("test_id", props.id);

            const url = `http://localhost:8000/clerk/savetestresults/`;
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => saveTestResposeHandler(data))
                .catch((error) => console.log(error));
        }
    };

    return (
        <>
            {modalOn && (
                <ResponseModal
                    onConfirm={hideModalHandler}
                    title={modalTitle}
                    message={modalMessage}
                />
            )}
            <FormCard>
                <form
                    className={`${classes["form"]}`}
                    autoComplete="off"
                    onSubmit={submitHandler}
                >
                    <h1 className={classes["form__title"]}>Save Test Result</h1>
                    <div className={`${classes["form__inputs"]}`}>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="testResult"
                            >
                                Test Result
                            </label>
                            <input
                                className={testResultInputClasses}
                                id="testResult"
                                type="text"
                                value={testResult}
                                name="testResult"
                                onChange={testResultChangeHandler}
                                onBlur={testResultInputBlurHandler}
                            />
                            {testResultErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {testResultErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="resultImage"
                            >
                                Test Result Image
                            </label>
                            <div>
                                <input
                                    className={`${imageFileInputClasses} ${classes["file-input"]}`}
                                    id="resultImage"
                                    type="file"
                                    accept="image/jpeg"
                                    value={imageFile}
                                    name="resultImage"
                                    onChange={imageFileChangeHandler}
                                    onBlur={imageFileInputBlurHandler}
                                />
                            </div>
                            {imageFileErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {imageFileErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                    </div>
                    <div className={`${classes["form__btn-group"]}`}>
                        <button
                            className={`${classes["form__btn"]}`}
                            // disabled={!formIsValid}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormCard>
            <button className={classes["go-back__btn"]} onClick={props.onBack}>
                Go Back
            </button>
        </>
    );
};

export default SaveTestResultForm;
