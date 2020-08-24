Tenants 
Login refresh tokens
Make call to get usedata
{
    rid,username,where
}



idea is that when you login in i send you the two tokens one lasts 2hr<Local Variable> the othe 2 weeks in Secure storage
So when you open the app first we see if you have a stored refresh token + Wifi
which i use to send to the api where you get an access token an load all the new userdata into the db

flow token+wifi -->Add to DB -->GenerateVIEW


# Dashboard
[*]Rent Balance to pay
[*]Bills Balance
[*]Payment History -- Graph
[*]Complains 
[*]Unit Details
[*]Notice Board
[*]Builing details Rules and regulations

Make a simple fltter rest api consumer
[]login
[]Store the tokens in to secure storage
[]Make a toast or popup based testing area
[]Do some sqllite for the app

{ tbl_add_fare
      "f_id": 44, 
      "type": "Rented",
      "floor_no": "12",
      "unit_no": "30",
      "rid": 20,
      "month_id": 9,
      "xyear": "2019",
      "rent": 10000,
      "water_bill": 600,
      "electric_bill": 700,
      "gas_bill": 800,
      "security_bill": 900,
      "utility_bill": 500,
      "other_bill": 0,
      "total_rent": 13500,
      "issue_date": "04/09/2019",
      "paid_date": "",
      "branch_id": 8,
      "bill_status": 0,
      "added_date": "2019-08-27T16:26:08.000Z"
    }




Material App
  title
  home ---Scaffold
            appBar







{ tbl_add_rent
  "user": {
    "rid": 112,
    "r_name": "John Doe",
    "r_email": "test@gmail.com",
    "r_contact": "+254797678252",
    "r_address": "sample address",
    "r_nid": "14496167",
    "r_floor_no": "12",
    "r_unit_no": "57",
    "r_advance": 20,
    "r_rent_pm": 20,
    "r_date": "08/08/2020",
    "r_gone_date": null,
    "r_password": "MTIzNDU2",
    "image": "0254F76D-9BE4-9784-52CC-E48A7BD7A40E.jpg",
    "r_status": 1,
    "r_month": 7,
    "r_year": 12,
    "branch_id": 8,
    "added_date": "2020-08-08T04:30:45.000Z"
  },
  "iat": 1598111126,
  "exp": 1598114726
}

Data required
/noticeboard <== branch_id