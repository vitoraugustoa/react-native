import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { History } from '../../models/history';
import { formatarValor } from '../../helpers/regexHelpers';

import {
  Container,
  Tipo,
  IconView,
  TipoText,
  ValorText,
} from './styles';

interface HistoryListProps {
  data: History;
  onDeleteItem: (data: History) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ data, onDeleteItem }) => {
  return (
    <TouchableWithoutFeedback onLongPress={() => onDeleteItem(data)}>
      <Container>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Icon name={data.tipo === "receita" ? "arrow-up" : "arrow-down"} color="#FFF" size={20} />
            <TipoText>{data.tipo}</TipoText>
          </IconView>
        </Tipo>

        <ValorText>
          R$ {formatarValor(data.valor)}
        </ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default HistoryList;