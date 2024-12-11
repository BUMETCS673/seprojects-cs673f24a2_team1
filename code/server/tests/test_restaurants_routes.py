from app.models import Restaurant

def test_get_restaurants(client, db_session):
    # Add test data to the database
    db_session.session.add(Restaurant(name="Test Restaurant", overall_rating=4.5))
    db_session.session.commit()

    # Test fetching restaurants
    response = client.get('/api/restaurants/get-restaurants')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0

def test_get_top_restaurants(client, db_session):
    # Add test data
    db_session.session.add(Restaurant(name="Top Restaurant", overall_rating=5.0))
    db_session.session.commit()

    # Test fetching top restaurants
    response = client.get('/api/restaurants/top-restaurants')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0

def test_get_restaurant_details(client, db_session):
    # Add a test restaurant
    restaurant = Restaurant(name="Detailed Restaurant", overall_rating=4.5)
    db_session.session.add(restaurant)
    db_session.session.commit()

    # Test fetching details of a valid restaurant
    response = client.get(f'/api/restaurants/details/{restaurant.restaurant_id}')
    assert response.status_code == 200
    assert 'name' in response.json

    # Test fetching details of an invalid restaurant
    response = client.get('/api/restaurants/details/999')
    assert response.status_code == 404
