import React, { useEffect } from "react";
import { SaveButton } from "./SaveButton";
import { InteractiveInput } from "./InteractiveInput";
import { NormalButton } from "./NormalButton";
import { PriorityButton } from "./PriorityButton";
import { getMonthName, isDeadlinePast, sortAndCombineLists } from "./Utils";

export const TasksList = ({
  mode,
  tasks,
  editingIndex,
  handleEdit,
  finishEditing,
  startEditing,
  deleteTask,
  changeTaskPriority,
  setTasks,
  rerenderFlag,
}) => {
  //------------------------------------------------------------------------------------------
  useEffect(() => {
    setTasks([]);
    setTasks(sortAndCombineLists());
  }, [rerenderFlag]);
  //------------------------------------------------------------------------------------------
  const getDeadline = (task) => {
    if (task.deadline) {
      const { day, month, year } = task.deadline;
      return `Need to complete up to: ${day}-${getMonthName(month)}-${year}`;
    } else {
      return "No deadline for this task";
    }
  };
  //------------------------------------------------------------------------------------------
  return (
    <>
      <ul className="todo-list list-group rounded-0 bg-transparent">
        {tasks.map((task, index) => (
          <div // task
            className={`interactive list-group-item-action border display-6 fs-2 ${mode} rounded-4 p-3 mb-4`}
            style={{
              filter: task.deadline
                ? isDeadlinePast(task)
                  ? mode === "dark-mode"
                    ? "drop-shadow(0 0 10px #ea868f)" // Deadline past + dark mode
                    : "drop-shadow(0 0 10px #b02a37)" // Deadline past + light mode
                  : mode === "dark-mode"
                  ? "drop-shadow(0 0 10px #6ea8fe)" // Deadline not past + dark mode
                  : "drop-shadow(0 0 10px #0a58ca)" // Deadline not past + light mode
                : "drop-shadow(0 0 5px #b2bec3)",
            }}
            key={index}
          >
            <li className="d-flex justify-content-end fw-bolder">
              {editingIndex === index ? (
                <>
                  <InteractiveInput // Edit Input
                    mode={mode}
                    onChangeMethod={(e) => handleEdit(index, e.target.value)}
                    type="text"
                    value={task.taskContent}
                    placeholder=""
                  />
                  <SaveButton // Save Button
                    mode={mode}
                    handleSaveTask={finishEditing}
                  />
                </>
              ) : (
                <>
                  <div className="container">
                    <div className="row align-items-center w-100">
                      <div // Task Content
                        className="col-8 flex-grow-1 word-wrap"
                      >
                        {task.taskContent}
                        <div className="fs-5 mt-3 fw-bolder">
                          {getDeadline(task)}
                        </div>
                      </div>
                      <div className="ml-auto col-4 container">
                        <div className="row justify-content-center">
                          <PriorityButton // Priority Button
                            mode={mode}
                            className="col"
                            name={task.priority}
                            selectLowPriority={() =>
                              changeTaskPriority(index, "LOW")
                            }
                            selectmidPriority={() =>
                              changeTaskPriority(index, "MID")
                            }
                            selectHighPriority={() =>
                              changeTaskPriority(index, "HIGH")
                            }
                            darkColorButton="outline-light"
                            lightColorButton="outline-dark"
                            case1="LOW"
                            case2="MID"
                            case3="HIGH"
                          />
                          <NormalButton // Edit Button
                            className="my-3 col"
                            mode={mode}
                            onClickHandle={() => {
                              startEditing(index);
                            }}
                            darkColor="outline-warning"
                            lightColor="outline-warning"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="25"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                          </NormalButton>
                          <NormalButton // Delete Button
                            className="my-3 ms-3 col"
                            mode={mode}
                            onClickHandle={() => deleteTask(index)}
                            darkColor="outline-danger"
                            lightColor="outline-danger"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="25"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </NormalButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
