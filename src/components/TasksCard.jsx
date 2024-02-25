import React from "react";
import { TasksList } from "./TasksList";

export const TasksCard = ({
  mode,
  user,
  tasks,
  editingIndex,
  handleEdit,
  finishEditing,
  startEditing,
  deleteTask,
  changeTaskPriority,
  rerenderFlag,
  setTasks,
  className,
}) => {
  return (
    <>
      <div // card
        className={`col card mt-3 rounded-4 ${mode} ${className}`}
        style={{
          filter: "drop-shadow(0 0 8px #b2bec3)",
        }}
      >
        <div // Todos board
          className="card-body"
        >
          {user ? (
            <div>
              <h2 className="mb-5">
                Welcome, {user.displayName || user.email} - your tasks to be
                done:
              </h2>
              {tasks.length > 0 ? (
                <>
                  <TasksList
                    mode={mode}
                    tasks={tasks}
                    setTasks={setTasks}
                    rerenderFlag={rerenderFlag}
                    editingIndex={editingIndex}
                    handleEdit={handleEdit}
                    finishEditing={finishEditing}
                    startEditing={startEditing}
                    deleteTask={deleteTask}
                    changeTaskPriority={(index, priority) =>
                      changeTaskPriority(index, priority)
                    }
                  />
                </>
              ) : (
                <div className={`empty text-center display-6 ${mode}`}>
                  <p>No tasks found !</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h3>Please login to see your tasks.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
