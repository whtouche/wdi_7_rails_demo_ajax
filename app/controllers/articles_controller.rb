class ArticlesController < ApplicationController

  def default_serializer_options
    {root: false}
  end

  respond_to :json

  def index
    @articles = Article.all
    respond_with(@articles)
  end

  def show
    @article = Article.find(params[:id])
    respond_with(@article)
  end

end
