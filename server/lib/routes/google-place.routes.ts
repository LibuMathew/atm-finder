import { GooglePlaceController } from "../controllers/google-place.controller";

export class GooglePlaceRoutes {

    public GooglePlaceController: GooglePlaceController = new GooglePlaceController();

    public routes(app): void {

        app.route('/api/place')
            .get(this.GooglePlaceController.getPlaces)
    }
}