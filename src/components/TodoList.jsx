import React, { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm";
import { auth, firestore } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { ChangeModeButton } from "./ChangeModeButton";
import { TasksCard } from "./TasksCard";
import {
  isDeadlinePast,
  findListByPriority,
  emptyLists,
  sortAndCombineLists,
  removeTaskFromList,
  addTaskToSortedList,
  getPriorityValue,
  list1,
} from "./Utils";

//------------------------------------------------------------------------------
export const TodoList = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [mode, setMode] = useState("light");
  const [rerenderFlag, setRerenderFlag] = useState(false);
  //------------------------------------------------------------------------------
  useEffect(
    () => {
      const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
        setUser(user);

        if (user) {
          // Reference to the user's collection in Firestore using user.uid
          const userCollectionRef = collection(firestore, user.uid + "_tasks");

          try {
            // Check if the user's collection exists
            const userCollectionSnapshot = await getDocs(userCollectionRef);

            emptyLists();

            if (!userCollectionSnapshot.empty) {
              // If the collection exists, fetch and set tasks from documents
              const tasks = [];
              userCollectionSnapshot.forEach((doc) => {
                const data = doc.data();
                // Only add tasks with content
                if (data.taskContent) {
                  tasks.push(data);
                }
              });

              tasks.forEach((task) => {
                if (task.deadline && isDeadlinePast(task)) {
                  list1.push(task);
                } else {
                  findListByPriority(task.priority).push(task);
                }
              });

              const sortedTasks = sortAndCombineLists();
              setTasks(sortedTasks);
            } else {
              await addDoc(userCollectionRef, {});
              setTasks([]);
            }
          } catch (error) {
            console.error(
              "Error checking or creating user collection:",
              error.message
            );
          }
        }
      });

      return () => {
        if (unsubscribeAuth) {
          unsubscribeAuth();
        }
      };
    },
    [rerenderFlag],
    []
  );
  //------------------------------------------------------------------------------
  // Save Mode to local storage
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);
  //------------------------------------------------------------------------------
  // Delete Task
  const deleteTask = async (index) => {
    const oldTasks = [...tasks];
    // const updatedTasks = [...tasks];
    const taskToDelete = oldTasks[index];

    // Get the task ID or any unique identifier
    const taskIdToDelete = taskToDelete.id;

    // Remove the task locally
    oldTasks.splice(index, 1);
    setTasks(oldTasks);

    removeTaskFromList(taskToDelete);

    if (user) {
      // Reference to the user's collection in Firestore
      const userCollectionRef = collection(firestore, user.uid + "_tasks");

      // Query to find the document based on the task ID
      const q = query(userCollectionRef, where("id", "==", taskIdToDelete));

      try {
        // Execute the query and get the snapshot
        const querySnapshot = await getDocs(q);

        // Check if there is a matching document
        if (!querySnapshot.empty) {
          // Get the reference to the document
          const matchingDocRef = querySnapshot.docs[0].ref;

          // Set the content field to an empty string in Firestore
          await setDoc(matchingDocRef, { taskContent: "" });

          // Delete the document after setting the content to an empty string
          await deleteDoc(matchingDocRef);
        } else {
          console.log("Document not found with ID:", taskIdToDelete);
        }
      } catch (error) {
        console.error("Error deleting task in Firestore:", error.message);
      }
    } else {
      // User is not authenticated, handle accordingly
      console.log("User not authenticated. Handle accordingly.");
    }
  };
  //------------------------------------------------------------------------------
  const startEditing = (index) => {
    setEditingIndex(index);
  };
  //------------------------------------------------------------------------------
  const finishEditing = () => {
    setEditingIndex(null);
  };
  //------------------------------------------------------------------------------
  const handleEdit = async (index, updatedTaskContent) => {
    const newTask = [...tasks];

    // Update the task locally
    newTask[index] = { ...newTask[index], taskContent: updatedTaskContent };
    setTasks(newTask);

    if (user) {
      // Reference to the user's collection in Firestore
      const userTasksCollection = collection(firestore, user.uid + "_tasks");

      // Get the task ID or any unique identifier
      const taskIdToEdit = newTask[index].id;

      // Query to find the document based on the task ID
      const q = query(userTasksCollection, where("id", "==", taskIdToEdit));

      try {
        // Execute the query and get the snapshot
        const querySnapshot = await getDocs(q);

        // Check if there is a matching document
        if (!querySnapshot.empty) {
          // Get the reference to the document
          const matchingDocRef = querySnapshot.docs[0].ref;

          // Update the content field in Firestore
          await updateDoc(matchingDocRef, { taskContent: updatedTaskContent });
        } else {
          console.log("Document not found with ID:", taskIdToEdit);
        }

        // // Update the document in Firestore
      } catch (error) {
        console.error("Error updating task in Firestore:", error.message);
      }
    } else {
      // User is not authenticated, handle accordingly
      console.log("User not authenticated. Handle accordingly.");
    }
  };
  //------------------------------------------------------------------------------
  const changeTaskPriority = async (index, newPriority) => {
    const updatedTasks = [...tasks];
    const taskToMove = updatedTasks[index];

    // Update the task locally
    updatedTasks[index] = { ...taskToMove, priority: newPriority };
    setTasks(updatedTasks);

    if (
      !isDeadlinePast
      // &&
      // newPriority != getPriorityValue(taskToMove.priority)
    ) {
      // Remove the task from the old priority list
      removeTaskFromList(taskToMove);

      addTaskToSortedList(taskToMove, newPriority);
    }
    // // Toggle the flag to force re-render
    // setRerenderFlag((prev) => !prev);

    if (user) {
      // Reference to the user's collection in Firestore
      const userTasksCollection = collection(firestore, user.uid + "_tasks");

      // Get the task ID or any unique identifier
      const taskIdToEdit = updatedTasks[index].id;

      // Query to find the document based on the task ID
      const q = query(userTasksCollection, where("id", "==", taskIdToEdit));

      try {
        // Execute the query and get the snapshot
        const querySnapshot = await getDocs(q);

        // Check if there is a matching document
        if (!querySnapshot.empty) {
          // Get the reference to the document
          const matchingDocRef = querySnapshot.docs[0].ref;

          // Update the content field in Firestore
          await updateDoc(matchingDocRef, { priority: newPriority });
        } else {
          console.log("Document not found with ID:", taskIdToEdit);
        }

        // // Update the document in Firestore
      } catch (error) {
        console.error(
          "Error updating task priority in Firestore:",
          error.message
        );
      }

      // Toggle the flag to force re-render
      setRerenderFlag((prev) => !prev);
    } else {
      // User is not authenticated, handle accordingly
      console.log("User not authenticated. Handle accordingly.");
    }
  };
  //------------------------------------------------------------------------------
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };
  //------------------------------------------------------------------------------
  const modeClass = mode === "dark" ? "dark-mode" : "light-mode";
  //------------------------------------------------------------------------------

  return (
    <div>
      <div
        className={`back container-fluid  ${modeClass}`}
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="row">
          <div // Mode Button
            className="pb-2 mt-3 "
          >
            <ChangeModeButton
              mode={modeClass}
              onClickHandle={toggleMode}
              darkModeContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  fill="currentColor"
                  className="bi bi-brightness-high"
                  viewBox="1 1 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                </svg>
              }
              lightModeContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  fill="currentColor"
                  className="bi bi-moon"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                </svg>
              }
            />
          </div>
          <div // title
            className="title col display-4 text-xl text-center fw-bold mb-5"
          >
            My ToDo List
          </div>
        </div>
        <div className="row mx-3 pb-5 justify-content-between">
          <div // tsak form
            className="col-xxl-5 col-xl-6 pe-3 me-5 mt-3 rounded-5 border-none"
          >
            <TaskForm
              setTasks={setTasks}
              mode={modeClass}
              addDoc={addDoc}
              tasks={tasks}
              user={user}
              setUser={setUser}
              rerenderFlag={rerenderFlag}
              setRerenderFlag={setRerenderFlag}
              getPriorityValue={(priority) => getPriorityValue(priority)}
            />
          </div>

          <TasksCard
            mode={modeClass}
            user={user}
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
        </div>
      </div>
    </div>
  );
};
