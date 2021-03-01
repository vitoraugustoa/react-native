import React from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from '../../models/taks';

import styles from './taskListStyles';

interface TaskListProps {
  data: Task;
  onPressDelete: ((keyTask: string) => void);
  onPressTask: ((task: Task) => void);
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => props.onPressDelete(props.data.key)}>
        <Icon name="trash" color="#FFF" size={20} />
      </TouchableOpacity>

      <View style={{ paddingRight: 15 }}>
        <TouchableWithoutFeedback onPress={() => props.onPressTask(props.data)}>
          <Text style={{ color: '#FFF', paddingRight: 10 }}>
            {props.data.value}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default TaskList;