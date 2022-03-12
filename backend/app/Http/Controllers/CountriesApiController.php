<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use Illuminate\Http\UploadedFile;

class CountriesApiController extends Controller {

    /**
     * 🚩 API POUR LES PAYS
     */

    public function createCountry(Request $request) {
        $name = $request->name;
        if(Country::where('name', $name)->exists()) {
            return response()->json([
                "message"=> $request->name." already exists :/"
            ], 404);
        }
        $country = new Country;
        $country->name = $request->name;
        $country->foundation = $request->foundation;
        $country->fall = $request->fall;
        $flag = $this->uploadFlag($request->flag, $name);
        if(!$flag) {
            return response()->json([
                "message" => "Image upload failure"
            ], 500);
        }
        $country->flag = $flag;

        $country->save();


        return response()->json([
            "message" => $country->name." created"
        ], 201);
    } 

    public function getAllCountries() {
        $countries = Country::get()->toJson(JSON_PRETTY_PRINT);
        return response($countries, 200);
    }

    public static function uploadFlag(UploadedFile $img, $name) {
        try{ 
            $img_name = str_replace(' ', '_', strtolower($name)).'_flag.'.$img->extension();
            $img->move(public_path('flags'), $img_name);
        } catch(Error $error) {
            return false;
        }

        return $img_name;
    }

    public static function destroyCountry(Request $request){
        if($request->name) {
            if(Country::where('name', $request->name)->exists()) {
                $country = Country::firstWhere('name', $request->name);
                $country->delete();

                return response()->json([
                    "message" => "Country $request->name removed"
                ], 202);
            }
            else {
                return response()->json([
                    "message" => "Country $request->name doesn't exist"
                ], 404);

            }
        }
        if($request->id) {
            if(Country::where('id', $request->id)->exists()) {
                $country = Country::find($request->id);
                $country->delete();

                return response()->json([
                    "message" => "Country n° $request->id removed"
                ], 202);
            }
            else {
                return response()->json([
                    "message"=> "Country n° $request->id doesn't exist"
                ], 404);
            }
        }
    }

}