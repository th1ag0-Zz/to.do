import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

interface EditTaskProps {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const isEqualTask = tasks.find((task) => task.title === newTaskTitle)

    if (isEqualTask) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      )
    } else {
      const taskData = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks((oldstate) => [...oldstate, taskData])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    )

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => setTasks(tasks.filter((item) => item.id !== id)),
        },
      ],
    )
  }

  function handleEditText(data: EditTaskProps) {
    const updatedTasks = tasks.map((task) =>
      task.id === data.taskId ? { ...task, title: data.taskNewTitle } : task,
    )

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditText}
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
