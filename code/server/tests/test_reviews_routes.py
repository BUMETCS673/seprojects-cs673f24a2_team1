from app.models import Restaurant, Review

def test_get_reviews(client, db_session):
    # Add test data
    restaurant = Restaurant(name="Review Test Restaurant")
    db_session.session.add(restaurant)
    db_session.session.commit()

    review = Review(restaurant_id=restaurant.restaurant_id, rating=5.0, review_text="Excellent!")
    db_session.session.add(review)
    db_session.session.commit()

    # Test fetching all reviews
    response = client.get('/api/reviews/')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0

def test_get_reviews_of_restaurant(client, db_session):
    # Add test data
    restaurant = Restaurant(name="Specific Restaurant")
    db_session.session.add(restaurant)
    db_session.session.commit()

    review = Review(restaurant_id=restaurant.restaurant_id, rating=4.5, review_text="Great!")
    db_session.session.add(review)
    db_session.session.commit()

    # Test fetching reviews of a specific restaurant
    response = client.get(f'/api/reviews/restaurant/{restaurant.restaurant_id}')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0

    # Test fetching reviews of a non-existent restaurant
    response = client.get('/api/reviews/restaurant/999')
    print(response)
    assert response.status_code == 404

def test_get_review_details(client, db_session):
    # Add a test review
    restaurant = Restaurant(name="Detailed Review Restaurant")
    db_session.session.add(restaurant)
    db_session.session.commit()

    review = Review(restaurant_id=restaurant.restaurant_id, rating=5.0, review_text="Outstanding!")
    db_session.session.add(review)
    db_session.session.commit()

    # Test fetching details of a valid review
    response = client.get(f'/api/reviews/details/{review.review_id}')
    assert response.status_code == 200
    assert 'review_text' in response.json

    # Test fetching details of an invalid review
    response = client.get('/api/reviews/details/999')
    assert response.status_code == 404
