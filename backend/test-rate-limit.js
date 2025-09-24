import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/auth';

async function testRateLimit() {
  console.log('Testing rate limiting on login endpoint...\n');
  
  const loginData = {
    email: 'test@example.com',
    password: 'wrongpassword'
  };

  try {
    // Make multiple requests to test rate limiting
    for (let i = 1; i <= 6; i++) {
      console.log(`Attempt ${i}:`);
      
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, data);
      
      if (response.status === 429) {
        console.log('✅ Rate limiting is working! Request blocked.');
        break;
      }
      
      console.log('---');
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error('Error testing rate limit:', error.message);
  }
}

// Test signup rate limiting
async function testSignupRateLimit() {
  console.log('\n\nTesting rate limiting on signup endpoint...\n');
  
  const signupData = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    fullName: 'Test User'
  };

  try {
    // Make multiple requests to test rate limiting
    for (let i = 1; i <= 6; i++) {
      console.log(`Attempt ${i}:`);
      
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...signupData,
          email: `test${Date.now() + i}@example.com` // Unique email for each attempt
        })
      });

      const data = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, data);
      
      if (response.status === 429) {
        console.log('✅ Rate limiting is working! Request blocked.');
        break;
      }
      
      console.log('---');
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error('Error testing signup rate limit:', error.message);
  }
}

// Run tests
testRateLimit().then(() => {
  testSignupRateLimit();
});
