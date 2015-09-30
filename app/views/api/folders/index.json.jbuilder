json.array! @folders do |folder|
  json.extract! folder, :name, :id
end
