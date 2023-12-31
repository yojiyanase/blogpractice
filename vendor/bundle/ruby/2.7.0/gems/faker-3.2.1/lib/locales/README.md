# How Locales Work

The default locale is English. You can see how it is implemented in the "translate" method in [Faker.rb](/lib/faker.rb).

Here's how to set it:

```ruby
# Sets the locale to "Simplified Chinese":
Faker::Config.locale = 'zh-CN'
```

It works so that once the Faker locale is set to a different location, the translate method will check that `.yml` file for an equivalent and use that data. If it doesn't exist, it defaults back to English. It uses the [I18n](https://github.com/ruby-i18n/i18n) gem to do this.

Using Chinese as an example, when the locale is set to Chinese and you attempt to call for hipster ipsem (which doesn't exist at the time of this writing), you will get English back. It checks the "zh-CH.yml" file, does not find "hipster" and then checks the "en.yml" file and returns a word from that array.

```ruby
Faker::Config.locale = 'zh-CN'
Faker::Hipster.word #=> "kogi"
```

## How to update a locale with more translations

T update a locale with more translation features, simply add a new field to the .yml file that corresponds to an existing piece of functionality in the "en.yml" file. In this example, that would mean providing Chinese hipster words.

```yaml
# /lib/locales/zh-CN.yml
hipster:
    - "屌丝"
```

```ruby
# Now this should work:
Faker::Hipster.word #=> "屌丝"
```

After you've done that, find or create a test file for the locale you've updated and test the functionality for that language.

In our hypothetical example here, one would add something like this to the "test-zh-locale.rb" file in the "test_ch_methods" method:

```ruby
assert Faker::Hipster.word.is_a? String
```

## How to set the default locale for in threaded server environments

If you want to modify the default locale that will be used in new threads, set it in your configuration:

```ruby
Faker::Config.default_locale = :pt
```

In threaded server environments, e.g., Puma, locale per thread can be set as the following:

```ruby
  Faker::Config.locale = :es
```
