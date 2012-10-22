class FetchArchive

	def self.set_last_fetch( storage, chatroom_id )
		last_fetch = storage[:last_fetch] || {}

		if last_fetch[chatroom_id]
			self.set_existing_last_fetch storage, last_fetch, chatroom_id
		else
			self.set_new_last_fetch storage, last_fetch, chatroom_id
		end
	end

	def self.set_existing_last_fetch( storage, last_fetch, chatroom_id )
		last_fetch_at = last_fetch[chatroom_id]
    last_fetch[chatroom_id] = Time.now.utc.to_i
    storage[:last_fetch] = last_fetch
    Time.at last_fetch_at
	end

	def self.set_new_last_fetch( storage, last_fetch, chatroom_id )
		last_fetch_at = Time.now.utc
    last_fetch[chatroom_id] = last_fetch_at.to_i
    storage[:last_fetch] = last_fetch
    last_fetch_at
	end

end