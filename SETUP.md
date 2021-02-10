# Rails API Setup Instructions

## Create a new Rails app

```sh
rails new project-name-backend --api --database=postgresql -T
```

- `--api`: Generate a project in API mode (no sessions/cookies; no view helpers; etc).
- `--database=postgresql`: Use Postgresql as the database. Optional, but if you
  plan on deploying, you must use Postgresql.
- `-T`: Skip test files.

## Setup CORS

Uncomment the `rack-cors` gem and install it:

```sh
bundle install
```

In `config/initializers/cors.rb`, update CORS configuration:

```rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    # make sure to update this when you deploy!

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

You can refer to the [rack-cors gem](https://github.com/cyu/rack-cors) for more
information about this file.

## Create a User Model

Uncomment the `bcrypt` gem to add user password authentication. Then, install
it:

```sh
bundle install
```

(optional) Add the `active_model_serializers` gem:

```sh
bundle add active_model_serializers
```

Generate a User model with any attributes you need:

```sh
rails g resource User username password_digest bio image
```

Make sure to use `password_digest` so that we can setup `bcrypt` to work with
it!

Update the User class with the `has_secure_password` macro from `bcrypt`, and
validations if you like:

```rb
class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
end
```

Create some seed data:

```rb
User.create(username: "ian", password: "123", bio: "Lead Instructor", image: "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png")
```

Setup the database:

```sh
rails db:create db:migrate db:seed
```

Test!

```txt
rails c
> User.first
=> <#User id:1 name:"ian" ...>
```
