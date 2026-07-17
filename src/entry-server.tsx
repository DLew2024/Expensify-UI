import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import App from './App';
import store from './store/store';

export function render(url: string) {
	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={url}>
				<App />
			</StaticRouter>
		</Provider>,
	);

	return { html };
}
