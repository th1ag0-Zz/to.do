import React, { useState, useRef, useEffect } from 'react'
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png'

export interface Task {
  id: number
  title: string
  done: boolean
}

interface EditTaskProps {
  taskId: number
  taskNewTitle: string
}

interface TasksItemProps {
  task: Task
  index: number
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (data: EditTaskProps) => void
}

export function TasksItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskEditText, setTaskEditText] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  // funções para editar
  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setTaskEditText(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskEditText })
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={taskEditText}
            onChangeText={setTaskEditText}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#c4c4c4',
    marginHorizontal: 24,
  },
})
