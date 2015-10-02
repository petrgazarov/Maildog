# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151002201639) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.string   "email",          null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "photo_src_path"
    t.string   "job_title"
    t.date     "birth_date"
    t.string   "gender"
    t.integer  "owner_id",       null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "contacts", ["owner_id", "email"], name: "index_contacts_on_owner_id_and_email", unique: true, using: :btree

  create_table "email_addressees", force: :cascade do |t|
    t.integer  "email_id"
    t.integer  "addressee_id",                null: false
    t.string   "email_type",   default: "to", null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "email_addressees", ["addressee_id"], name: "index_email_addressees_on_addressee_id", using: :btree
  add_index "email_addressees", ["email_id", "email_type"], name: "index_email_addressees_on_email_id_and_email_type", using: :btree
  add_index "email_addressees", ["email_id"], name: "index_email_addressees_on_email_id", using: :btree

  create_table "email_labels", force: :cascade do |t|
    t.integer  "email_id",   null: false
    t.integer  "label_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "email_labels", ["email_id"], name: "index_email_labels_on_email_id", using: :btree
  add_index "email_labels", ["label_id"], name: "index_email_labels_on_label_id", using: :btree

  create_table "email_threads", force: :cascade do |t|
    t.text     "subject"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "emails", force: :cascade do |t|
    t.string   "subject"
    t.text     "body"
    t.integer  "sender_id"
    t.boolean  "starred",           default: false
    t.boolean  "checked",           default: false
    t.date     "date",                              null: false
    t.time     "time",                              null: false
    t.integer  "original_email_id"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "parent_email_id"
    t.boolean  "draft",             default: false
    t.boolean  "trash",             default: false
  end

  add_index "emails", ["original_email_id"], name: "index_emails_on_original_email_id", using: :btree
  add_index "emails", ["sender_id", "checked"], name: "index_emails_on_sender_id_and_checked", using: :btree
  add_index "emails", ["sender_id", "date"], name: "index_emails_on_sender_id_and_date", using: :btree
  add_index "emails", ["sender_id", "starred"], name: "index_emails_on_sender_id_and_starred", using: :btree
  add_index "emails", ["sender_id", "time"], name: "index_emails_on_sender_id_and_time", using: :btree
  add_index "emails", ["sender_id"], name: "index_emails_on_sender_id", using: :btree

  create_table "labels", force: :cascade do |t|
    t.text     "name",       null: false
    t.integer  "owner_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "labels", ["owner_id"], name: "index_labels_on_owner_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.string   "photo_src_path"
    t.string   "job_title"
    t.date     "birth_date"
    t.string   "gender"
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
