<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Country;
use App\Http\Controllers\CountriesApiController;

class EventApiController extends Controller
{
    /**
     * 📅 API DES EVENEMENTS HISTORIQUES
     */
    public function getAllEvents() {
        // récupérer les events
        $events = Event::with('country')->get()->toJson(JSON_PRETTY_PRINT);
        return response($events, 200);
    }

    public function createEvent(Request $request) {
        // créer nouvel évènement ! :D
        $event = new Event; 
        $event->date = $request->date;
        $event->name = htmlspecialchars_decode($request->name);
        $event->coordinates = $request->coordinates;
        $event->description = htmlspecialchars_decode($request->description);
        $event->country_id = $request->country_id;

        // if in request, country is set, then use it for a new country
        if($request->country_name && !Country::where('name', $request->country_name)->exists()) {
            $country = new Country;
            $country->name = $request->country_name;
            $country->foundation = $request->country_foundation;
            $country->fall = $request->country_fall;
            if($request->country_flag) {
                $country->flag = CountriesApiController::uploadFlag($request->country_flag, $request->country_name);
            }
            $country->save();
            $event->country_id = $country->getKey();
        }

        // if in request, country name is set, but already exists, then
        // add country id instead:
        if($request->country_name && Country::where('name', $request->country_name)->exists()) {
            $country = Country::all()->firstWhere('name', $request->country_name);
            $event->country_id = $country->getKey();
        }

        $event->save();

        return response()->json([
            "message" => $event
        ], 201);

    }

    public function getEvent($id) {
        // récupérer évènement spécifique
        if(Event::where('id', $id)->exists()) {
            $event = Event::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($event, 200);
        }
        else {
            return response()->json([
                'message'=> "No such event. See all events by GETting /events"
            ], 404);
        }
    }

    public function getEventByCentury($date){
        // récupérer un évènement selon un siècle donné (ex : avec 100, on aura tous les évènements de 100 à 200)
        $events = Event::with('country')->whereBetween('date', [$date, $date+100])->get()->toJson(JSON_PRETTY_PRINT);
        return response($events, 200);
    }

    public function updateEvent(Request $request, $id) {
        // mettre à jour un évènement
        // reçoit un objet JSON {name, date...} avec ce qui doit être modifié
        if(Event::where('id', $id)->exists()) {
            $event = Event::find($id);
            $event->date = is_null($request->date) ? $event->date : $request->date;
            $event->name = is_null($request->name) ? $event->name : $request->name;
            $event->coordinates = is_null($request->coordinates) ? $event->coordinates : $request->coordinates;
            $event->description = is_null($request->description) ? $event->description : $request->description;
            $event->country_id = is_null($request->country_id) ? $event->country_id : $request->country_id ;
            
            $event->save();
            return response()->json([
                "message" => "Event updated !"
            ], 200);
        
        }
        else {
            return response()->json([
                "message" => "Non-existing event. Create one with a POST"
            ], 404);
        }
    }

    public function deleteEvent($id) {
        // révisionnisme historique
        if(Event::where('id', $id)->exists()) {
            $event = Event::find($id);
            $name = $event->name;
            $event->delete();

            return response()->json([
                "message" => "$name removed"
            ], 202);
        } else {
            return response()->json([
                "message" => "Event $id doesn't exist"
            ], 404);
        }
    }

   
}
