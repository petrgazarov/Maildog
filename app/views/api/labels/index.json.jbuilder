json.array! @labels do |label|
  json.partial! "api/labels/label", label: label
end
