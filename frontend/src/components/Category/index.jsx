import React, { useEffect } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Empty from "./Empty";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const ERROR_SAVE = "ERROR_SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";


export default function Category({id, category, saveCategory, deleteCategory}) {
  const { mode, transition, back } = useVisualMode(
    category ? SHOW : EMPTY
  );

  function save(category) {
    transition(SAVING);

    saveCategory(id, category)
      .then(() => {
        const IS_NEW = !id;
        if (IS_NEW) {
          transition(EMPTY);
        } else {
          transition(SHOW)
        }
      })
      .catch(() => transition(ERROR_SAVE, true));
  }

  function savePresets(presets) {
    const newCategory = {
      ...category,
      presets,
    };

    save(newCategory);
  }

  function confirmDelete() {
    transition(DELETING, true);

    deleteCategory(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  useEffect(() => {
    if (category && mode === EMPTY) {
      transition(SHOW);
    }

    if (!category && mode === SHOW) {
      transition(EMPTY);
    }
  }, [category, transition, mode]);

  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          category={category}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          onSave={savePresets}
        />
      )}
      {mode === CREATE && (
        <Form
          category={null}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          category={category}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this category?"}
          onConfirm={confirmDelete}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Could not delete category"}
          onClose={back}
        />
      )}
    </div>
  )
}
