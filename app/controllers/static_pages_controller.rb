# require 'byebug'

class StaticPagesController < ApplicationController
  before_action :require_user!

  def mail
  end

  def contacts
  end

  def search
    @search_results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
      .page(params[:page])

    render :search
  end
end
