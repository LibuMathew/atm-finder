
import { GooglePlaceRoutes } from "./routes/google-place.routes";

export class Routes {

    public googlePlaceRoutes: GooglePlaceRoutes = new GooglePlaceRoutes();

    constructor(app) {
        this.googlePlaceRoutes.routes(app);
    }

}