import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';
import { UserContext } from '../models/userContext';

function Routes() {
  const { signed, isLoading } = useContext(AuthContext) as UserContext;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    )
  } else {
    return (
      signed ? <AppRoutes /> : <AuthRoutes />
    )
  }
}

export default Routes;