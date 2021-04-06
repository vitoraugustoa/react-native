import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { PickerView } from './styles';

interface PickerProps {
  onValueChange: (value: any) => void;
  tipo: string;
}

const PickerIOS: React.FC<PickerProps> = (props) => {
  return (
    <PickerView>
    <Picker
      style={{
        width: '100%'
      }}
      selectedValue={props.tipo}
      onValueChange={(itemmValue) => props.onValueChange(itemmValue)}
    >
      <Picker.Item label="Receita" value="receita" />
      <Picker.Item label="Despesa" value="despesa" />
    </Picker>
  </PickerView>
  );
}

export default PickerIOS;