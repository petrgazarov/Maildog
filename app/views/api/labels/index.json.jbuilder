json.array! @labels do |label|
  json.extract! label, :name, :id
end
