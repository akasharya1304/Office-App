import { useState } from "react";
import { DateFormat } from "~/constant/method";

function TextField({
  name,
  maxLength = null,
  minLength = null,
  helperText,
  pattern = "",
  required = false,
  defaultValue,
  handleFormError,
  handleFormValue = false,
}) {
  const [error, setError] = useState(false);

  const handleInputError = (e) => {
    handleFormValue(e.target.name, e.target.value);
    if (pattern) {
      if (pattern(e.target.value)) {
        setError(false);
        handleFormError(e.target.name, false);
      } else {
        setError(true);
        handleFormError(e.target.name, true);
      }
    }
  };
  return (
    <>
      <input
        type="text"
        name={name}
        id={name}
        maxLength={maxLength}
        minLength={minLength}
        onChange={(e) => handleInputError(e)}
        autoComplete="given-name"
        defaultValue={defaultValue}
        className="block w-full peer outline-none rounded-md border-0 py-1.5 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6"
        required={required}
      />
      {Boolean(pattern && error) && (
        <p className="mt-0 mb-0 ml-2 text-red-500 text-sm">
          {helperText || "Invalid Value"}
        </p>
      )}
    </>
  );
}

function NumberField({
  name,
  maxLength = null,
  minLength = null,
  required = false,
  defaultValue,
  handleFormValue = false,
}) {
  const handleChangeValue = (e) => {
    if (handleFormValue) handleFormValue(e.target.name, e.target.value);
  };

  return (
    <input
      type="text"
      name={name}
      id={name}
      onKeyPress={(event) => {
        if (event.charCode >= 48 && event.charCode <= 57) {
          // let it happen, don't do anything
        } else {
          event.preventDefault();
        }
      }}
      onChange={(e) => handleChangeValue(e)}
      maxLength={maxLength}
      minLength={minLength}
      defaultValue={defaultValue || null}
      autoComplete="given-name"
      className="block w-full outline-none rounded-md border-0 py-1.5 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6"
      required={required}
    />
  );
}

function DecimalField({
  name,
  maxLength = null,
  minLength = null,
  required = false,
  defaultValue,
  handleFormValue = false,
}) {
  const handleChangeValue = (e) => {
    if (handleFormValue) handleFormValue(e.target.name, e.target.value);
  };

  return (
    <input
      type="text"
      name={name}
      id={name}
      onKeyPress={(event) => {
        if (
          (event.charCode >= 48 && event.charCode <= 57) ||
          event.charCode === 46
        ) {
          // let it happen, don't do anything
        } else {
          event.preventDefault();
        }
      }}
      onChange={(e) => handleChangeValue(e)}
      maxLength={maxLength}
      minLength={minLength}
      defaultValue={defaultValue || null}
      autoComplete="given-name"
      className="block w-full outline-none rounded-md border-0 py-1.5 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6"
      required={required}
    />
  );
}

function EmailField({
  name,
  defaultValue,
  maxLength = null,
  minLength = null,
  pattern,
  required = false,
  handleFormError,
}) {
  const [error, setError] = useState(false);

  const handleInputError = (e) => {
    if (pattern(e.target.value)) {
      setError(false);
      handleFormError(e.target.name, false);
    } else {
      setError(true);
      handleFormError(e.target.name, true);
    }
  };
  return (
    <>
      <input
        type="email"
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
        onChange={(e) => handleInputError(e)}
        autoComplete="given-name"
        className="block w-full peer outline-none rounded-md border-0 py-1.5 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6"
        required={required}
      />
      {Boolean(pattern && error) && (
        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Invalid email
        </p>
      )}
    </>
  );
}

function Select({
  name,
  options,
  defaultValue,
  valueKey,
  labelKey,
  required = false,
  handleFormValue = false,
}) {
  const handleChangeValue = (e) => {
    if (handleFormValue) handleFormValue(e.target.name, e.target.value);
  };

  return (
    <select
      key={name + "select"}
      id={name}
      name={name}
      onChange={(e) => handleChangeValue(e)}
      defaultValue={defaultValue || null}
      autoComplete="country-name"
      className="block w-full peer outline-none rounded-md border-0 py-1.5 px-2 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6"
      required={required}
    >
      <option className="hidden" value="" selected></option>
      {options ? (
        options.map((d) => <option value={d[valueKey]}>{d[labelKey]}</option>)
      ) : (
        <option></option>
      )}
    </select>
  );
}

function Switch({ name, defaultValue, disabled = false }) {
  const [is_active, setIsActive] = useState(defaultValue);
  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
        <input
          checked={is_active}
          onChange={() => setIsActive(!is_active)}
          id="switch-1"
          name={name}
          type="checkbox"
          disabled={disabled}
          className="absolute w-8 h-4 transition-colors duration-300 rounded-full bg-gray-400 
          appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 
          peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
        />
        <label
          htmlFor="switch-1"
          className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 
          cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md 
          transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 
          before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 
          before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity 
          hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 
          peer-checked:before:bg-blue-500"
        >
          <div
            className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
            data-ripple-dark="true"
          ></div>
        </label>
      </div>
    </div>
  );
}

function TextArea({
  name,
  minHeight = "min-h-[100px]",
  fontSize = "text-lg",
  defaultValue,
  required = false,
  handleFormValue = false,
}) {
  const handleChangeValue = (e) => {
    if (handleFormValue) handleFormValue(e.target.name, e.target.value);
  };

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        defaultValue={defaultValue || ""}
        onChange={(e) => handleChangeValue(e)}
        className={`w-full h-full ${minHeight} resize-none peer outline-none rounded-md border-0 py-1 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:${fontSize} sm:leading-4 `}
        required={required}
      />
    </div>
  );
}

function DatePicker({
  name,
  defaultValue,
  required = false,
  handleFormValue = false,
}) {
  const handleChangeValue = (e) => {
    if (handleFormValue)
      handleFormValue(e.target.name, e.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        type="date"
        name={name}
        defaultValue={defaultValue || ""}
        onChange={(e) => handleChangeValue(e)}
        className="block w-full outline-none rounded-md border-0 py-1.5 px-3 dark:bg-slate-900
      text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-amber-600 text-sm sm:text-lg sm:leading-6 dark:[color-scheme:dark]"
        required={required}
      />
    </div>
  );
}

export {
  TextField,
  NumberField,
  DecimalField,
  EmailField,
  Select,
  Switch,
  TextArea,
  DatePicker,
};
