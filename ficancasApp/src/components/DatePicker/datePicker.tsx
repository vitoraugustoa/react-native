import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  Header,
} from './styles';
import { onChange } from 'react-native-reanimated';

export interface DatePickerProps {
  onClose: () => void;
  onChange: (data: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [dateNow, setDateNow] = useState(new Date());

  return (
    <Container>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={props.onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
        value={dateNow}
        mode="date"
        display="default"
        onChange={(event, date) => {
          const currentDate = date || dateNow;
          setDateNow(currentDate);
          props.onChange(currentDate);
        }}
        style={{ backgroundColor: 'white' }}
      />
    </Container>
  );
}

export default DatePicker;