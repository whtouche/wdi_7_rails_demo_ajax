class ArticlesController < ApplicationController

  def default_serializer_options
    {root: false} # Eliminate "Articles" header from json output
  end

  respond_to :json

  def index
    # sleep(2)

    @articles = Article.all
    respond_with(@articles)
  end

  def show
    @article = Article.find(params[:id])
    respond_with(@article)
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      respond_with(@article)
    else
      respond_with(@article.errors)
    end
  end

  def update
    @article = Article.find(article_params[:id])

    if @article.update(params[:article])
      head :no_content
    else
      respond_with(@article.errors)
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    head :no_content
  end

  private

  def article_params
    params.require(:article).permit(:id, :title, :body)
  end
end
