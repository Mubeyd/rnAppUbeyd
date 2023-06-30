import { Provider } from 'react-redux';
import { store } from '../redux/store';

export const ReduxProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
