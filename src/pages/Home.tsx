import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const taskData = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks((oldstate) => [...oldstate, taskData])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    )

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
