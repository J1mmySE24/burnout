import unittest
from base import api, setup_mongo_client
from unittest.mock import patch, Mock 
from flask import json
from flask_jwt_extended import create_access_token

class APITestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = api
        self.app.config['TESTING'] = True
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.request_context = self.app.test_request_context()
        self.request_context.push()
        setup_mongo_client(self.app)  # Set up the mongo client after changing the TESTING flag
        self.client = self.app.test_client()
        self.jwt_token = "test_jwt_token"
        print("Using MongoDB client:", type(self.app.mongo_client)) 


    def tearDown(self):
                # Pop the contexts after tests
            self.request_context.pop()
            self.app_context.pop()
    
    
    def test_get_events(self):
        # Create a mock collection
        db = self.app.mongo_client['test']
        collection = db['events']

        # Replace the collection's find method with a Mock object
        mock_find = Mock()
        collection.find = mock_find
        mock_find.return_value = [
            {"_id": "Event 1"},
            {"_id": "Event 2"},
        ]

        response = self.client.get('/events')
        self.assertEqual(response.status_code, 200)


    @patch("pymongo.collection.Collection.update_one")
    def test_register_success(self, mock_update_one):
        app_client = api.test_client()  # Create a test client for this test case

        # Mock the update_one method to simulate a successful registration
        mock_update_one.return_value = Mock(upserted_id=123)

        test_data = {
            'email': 'test_user',
            'password': 'test_password',
            'firstName': 'Test',
            'lastName': 'User'
        }

        response = app_client.post('/register', json=test_data)

        self.assertEqual(response.status_code, 200)

        response_data = response.get_json()
        self.assertEqual(response_data['msg'], "register successful")

    def test_unauthorized_get_user_registered_events(self):
        # Mock the database query result
        app_client = api.test_client()

        db = app_client.application.mongo_client['test']  # Access the app's Mongo client
        collection = db['user']
        mock_find = Mock()

        collection.find = mock_find
        mock_find.return_value = [
            {"eventTitle": "Yoga"},
            {"eventTitle": "Swimming"}
        ]

        with patch("flask_jwt_extended.get_jwt_identity", return_value="test_user"):
            response = app_client.get('/usersEvents')

        self.assertEqual(response.status_code, 401)


    @patch('base.request')
    @patch('base.jwt_required')
    @patch('base.mongo')
    def test_unauthorized_enrolled_true(self, mock_mongo, mock_jwt_required, mock_request):
        app_client = api.test_client()
        # Mock request.json() method to return test data
        mock_request.json.return_value = {'eventTitle': 'Event Name'}
        
        # Mock get_jwt_identity() to return a test user identity
        mock_jwt_required.return_value = lambda f: f

        # Mock the find_one method to return an enrollment
        mock_mongo.user.find_one.return_value = {'email': 'test@example.com', 'eventTitle': 'Event Name'}

        response = app_client.post('/is-enrolled')
        data = json.loads(response.get_data(as_text=True))

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_my_profile_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/profile')

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_usersEvents_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/usersEvents')

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_foodCalorieMapping_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/foodCalorieMapping')

        self.assertEqual(response.status_code, 401)


    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_weekHistory_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/weekHistory')

        self.assertEqual(response.status_code, 405)  

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_caloriesBurned_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/caloriesBurned')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_goalsUpdate_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/goalsUpdate')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_profileUpdate_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/profileUpdate')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_caloriesConsumed_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()
        # Mock get_jwt_identity() to return None, indicating an unauthorized user
        mock_get_jwt_identity.return_value = None

        response = app_client .get('/caloriesConsumed')

        self.assertEqual(response.status_code, 405) 

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_createFood_success(self, mock_mongo, mock_update_one):
        app_client = api.test_client()

        mock_update_one.return_value = Mock(upserted_id=123)

        test_data = {
            'foodName': 'test_food',
            'calories': 'test_value'
        }

        response = app_client .post('/createFood', json=test_data)

        self.assertEqual(response.status_code, 200)
        
        response_data = response.get_json()
        self.assertEqual(response_data['status'], "Data saved successfully")

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_createMeal_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        test_data = {
            'mealName': 'test_meal',
            'ingredients': ['test_ingredient_1', 'test_ingredient_2']
        }

        response = app_client .post('/createMeal', json=test_data)

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_unenroll_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        test_data = {
            'eventTitle': 'test_title'
        }

        response = app_client .post('/unenroll', json=test_data)

        self.assertEqual(response.status_code, 401)

    @patch('base.get_jwt_identity')
    @patch('base.mongo')
    def test_myMeals_unauthorized(self, mock_mongo, mock_get_jwt_identity):
        app_client = api.test_client()

        mock_get_jwt_identity.return_value = None

        response = app_client .get('/myMeals')

        self.assertEqual(response.status_code, 401)
        
    @patch('base.requests.get')
    @patch('os.getenv')
    def test_get_top_resources_success(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()

        mock_getenv.return_value = 'fake_api_value'

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
        'articles': [
            {'title': 'Fitness Trends 2024'},
            {'title': 'Nutrition Tips'},
            {'title': '[Removed] Controversial Article'}
        ]
        }
        mock_requests_get.return_value = mock_response
    
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)

    @patch('base.requests.get')
    @patch('os.getenv')
    def test_get_top_resources_exception_api_error(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()

        mock_getenv.return_value = 'fake_api_value'

        mock_response = Mock()
        mock_response.status_code = 400
        mock_response.text = 'Bad Request'
        mock_requests_get.return_value = mock_response
    
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'error': 'Error fetching news'})

    @patch('base.requests.get') 
    @patch('os.getenv')
    def test_get_top_resources_exception(self, mock_getenv, mock_requests_get):
        app_client = api.test_client()
        mock_getenv.return_value = 'fake_api_key'
    
        mock_requests_get.side_effect = Exception("Network error")
        response = app_client.get('/resources')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json, [])

    def test_chatbot_valid_question(self):
        app_client = api.test_client()
        response = app_client.post('/chatbot', json={'question': 'What are some benefits of exercise?'})
        
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn('answer', data)
        self.assertNotEqual(data['answer'], "")
    
    def test_logout(self):
        app_client = api.test_client()
        response = app_client.post('/logout', headers={"Authorization": f"Bearer {self.jwt_token}"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"msg": "logout successful"})

    def test_register_success(self):
        app_client = api.test_client()
        response = app_client.post('/register', json={
            'email': 'test@example.com',
            'password': 'testpassword',
            'firstName': 'Test',
            'lastName': 'User'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'register successful', response.data)



    def test_logout_success(self):
        app_client = api.test_client()
        response = app_client.post('/logout')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'logout successful', response.data)
    
    
    def test_get_events_no_events(self):
        app_client = api.test_client()
        response = app_client.get('/events')

        # Assert: Check for a 200 status code and the correct response data
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, [])


    
   

    def test_get_events_with_additional_properties(self):
        app_client = api.test_client()
        db = self.app.mongo_client['test']
        collection = db['events']
        mock_events = [
            {"_id": "605c72f44f1a2b3c3c5e4f7f", "name": "Event 1", "date": "2024-01-01", "location": "Location A"},
            {"_id": "605c72f44f1a2b3c3c5e4f80", "name": "Event 2", "date": "2024-01-02", "location": "Location B"}
        ]
        collection.insert_many(mock_events)


        response = app_client.get('/events')


        response_data = response.get_json()
        for event in response_data:
            self.assertIn("location", event) 


    def test_get_events_event_format(self):
        app_client = api.test_client()
        db = self.app.mongo_client['test']
        collection = db['events']
        mock_events = [
            {"_id": "605c72f44f1a2b3c3c5e4f7f", "name": "Event 1", "date": "2024-01-01"},
        ]
        collection.insert_many(mock_events)

        # Act: Make a GET request to the events endpoint
        response = app_client.get('/events')

        # Assert: Check that the returned format is correct
        response_data = response.get_json()
        self.assertIsInstance(response_data, list)  # Ensure the response is a list
        for event in response_data:
            self.assertIsInstance(event, dict)  # Ensure each event is a dictionary
            self.assertIn("_id", event)  # Check for _id
            self.assertIn("name", event)  # Check for name
            self.assertIn("date", event)  # Check for date

    def test_get_events_multiple_event_types(self):
        app_client = api.test_client()
        db = self.app.mongo_client['test']
        collection = db['events']
        mock_events = [
            {"_id": "605c72f44f1a2b3c3c5e4f7f", "name": "Music Concert", "date": "2024-01-01", "type": "concert"},
            {"_id": "605c72f44f1a2b3c3c5e4f80", "name": "Art Exhibition", "date": "2024-01-02", "type": "exhibition"},
            {"_id": "605c72f44f1a2b3c3c5e4f81", "name": "Tech Conference", "date": "2024-01-03", "type": "conference"}
        ]
        collection.insert_many(mock_events)

        # Act: Make a GET request to the events endpoint
        response = app_client.get('/events')

        # Assert: Check that all events are returned
        response_data = response.get_json()
        self.assertEqual(len(response_data), 3)  # Ensure all events are returned

        # Check for different event types
        types_found = {event["type"] for event in response_data}
        self.assertIn("concert", types_found)
        self.assertIn("exhibition", types_found)
        self.assertIn("conference", types_found)


    @patch('base.get_jwt_identity')  # Mock JWT identity
    def test_get_fitness_plan_not_found(self, mock_get_jwt_identity):
        app_client = api.test_client()
        db = self.app.mongo_client['test']
        collection = db['users']
        mock_get_jwt_identity.return_value = 'user@example.com'
        
        # Mock the database call to return None (user not found)
        collection.find_one = Mock(return_value=None) 

        
        token = create_access_token(identity='user@example.com')

        response = app_client.get('/getFitnessPlan', headers={"Authorization": f"Bearer {token}"})

        # Assert
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json['status'], "Not Found")
        self.assertIn("message", response.json)
        
    def test_add_user_consumed_calories_success(self):
        test_email = 'user@example.com'
        app_client = api.test_client()
        db = self.app.mongo_client['test']
        collection = db['users']
        collection.insert_one({
            "email": test_email,
            "foodConsumed": []
        })
        data = {
            "intakeDate": "2023-10-17",
            "intakeFoodItem": "Apple",
            "intakeCalories": 95
        }

        token = create_access_token(identity=test_email)

        response = app_client.post(
            '/caloriesConsumed',
            headers={'Authorization': f'Bearer {token}'},
            data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['status'], "Data saved successfully")

        user_data = collection.find_one({"email": test_email})
        self.assertIsNotNone(user_data)



if __name__ == "__main__":
    unittest.main()
