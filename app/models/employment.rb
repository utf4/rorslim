class Employment < ApplicationRecord
  validates :employer, :start_date, :end_date, presence: true
end