import { Link } from 'react-router';
import { NavigationRoutePaths } from '../../utils/Navigation/NavigationRoutePaths';

const NotFoundPage = () => {
	return (
		<div>
			Page not found 404 -<Link to={NavigationRoutePaths.ROOT}> Go home</Link>
		</div>
	);
};

export default NotFoundPage;
